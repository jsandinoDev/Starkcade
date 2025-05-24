use starknet::ContractAddress;

#[starknet::interface]
pub trait ISocialPrediction<TContractState> {
    // Read functions
    fn get_event(
        self: @TContractState, event_id: u256,
    ) -> (ContractAddress, felt252, Array<felt252>, u64, bool, felt252, u256);
    fn get_user_stats(self: @TContractState, user: ContractAddress) -> (u256, u256, u256);
    fn get_bet(
        self: @TContractState, event_id: u256, user: ContractAddress,
    ) -> (felt252, u256, bool);
    fn get_event_counter(self: @TContractState) -> u256;
    fn get_contract_balance(self: @TContractState) -> u256;
    fn get_event_bets(
        self: @TContractState, event_id: u256,
    ) -> Array<(ContractAddress, felt252, u256)>;

    // Write functions
    fn create_event(
        ref self: TContractState, description: felt252, outcomes: Array<felt252>, deadline: u64,
    ) -> u256;
    fn place_bet(ref self: TContractState, event_id: u256, outcome: felt252, amount: u256);
    fn resolve_event(ref self: TContractState, event_id: u256, winning_outcome: felt252);
    fn claim_reward(ref self: TContractState, event_id: u256) -> u256;
    fn withdraw(ref self: TContractState, amount: u256);
}

#[starknet::contract]
pub mod SocialPrediction {
    use core::array::ArrayTrait;
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::contract_address::contract_address_const;
    use starknet::storage::{
        Map, MutableVecTrait, StorageMapReadAccess, StorageMapWriteAccess, StoragePathEntry,
        StoragePointerReadAccess, StoragePointerWriteAccess, Vec, VecTrait,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    // Constants
    const HOUSE_FEE: u256 = 200; // 2% house fee (200 = 2.00%)
    const PERCENTAGE_BASE: u256 = 10000; // Base for percentage calculations

    // STRK Token address - Should be changed for different networks
    pub fn STRK_ADDRESS() -> ContractAddress {
        contract_address_const::<
            0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d,
        >()
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        EventCreated: EventCreated,
        BetPlaced: BetPlaced,
        EventResolved: EventResolved,
        RewardClaimed: RewardClaimed,
    }

    #[derive(Drop, starknet::Event)]
    struct EventCreated {
        #[key]
        event_id: u256,
        #[key]
        creator: ContractAddress,
        description: felt252,
        deadline: u64,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct BetPlaced {
        #[key]
        event_id: u256,
        #[key]
        user: ContractAddress,
        outcome: felt252,
        amount: u256,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct EventResolved {
        #[key]
        event_id: u256,
        winning_outcome: felt252,
        total_bets: u256,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct RewardClaimed {
        #[key]
        event_id: u256,
        #[key]
        user: ContractAddress,
        reward: u256,
        timestamp: u64,
    }

    #[storage]
    struct Storage {
        // Event storage
        event_creators: Map<u256, ContractAddress>,
        event_descriptions: Map<u256, felt252>,
        event_outcomes: Map<u256, Vec<felt252>>,
        event_deadlines: Map<u256, u64>,
        event_resolved: Map<u256, bool>,
        event_winning_outcomes: Map<u256, felt252>,
        event_total_bets: Map<u256, u256>,
        event_counter: u256,
        // Bet storage
        bet_outcomes: Map<(u256, ContractAddress), felt252>,
        bet_amounts: Map<(u256, ContractAddress), u256>,
        bet_claimed: Map<(u256, ContractAddress), bool>,
        // User stats storage
        user_total_bets: Map<ContractAddress, u256>,
        user_total_wins: Map<ContractAddress, u256>,
        user_total_rewards: Map<ContractAddress, u256>,
        // Event participants for tracking
        event_participants: Map<u256, Vec<ContractAddress>>,
        outcome_totals: Map<(u256, felt252), u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
        self.event_counter.write(0);
    }

    #[abi(embed_v0)]
    impl SocialPredictionImpl of super::ISocialPrediction<ContractState> {
        // Read functions
        fn get_event(
            self: @ContractState, event_id: u256,
        ) -> (ContractAddress, felt252, Array<felt252>, u64, bool, felt252, u256) {
            let creator = self.event_creators.read(event_id);
            let description = self.event_descriptions.read(event_id);
            let deadline = self.event_deadlines.read(event_id);
            let resolved = self.event_resolved.read(event_id);
            let winning_outcome = self.event_winning_outcomes.read(event_id);
            let total_bets = self.event_total_bets.read(event_id);

            // Get outcomes array
            let mut outcomes = ArrayTrait::new();
            let outcomes_len = self.event_outcomes.entry(event_id).len();
            for i in 0..outcomes_len {
                outcomes.append(self.event_outcomes.entry(event_id).at(i).read());
            }
            (creator, description, outcomes, deadline, resolved, winning_outcome, total_bets)
        }

        fn get_user_stats(self: @ContractState, user: ContractAddress) -> (u256, u256, u256) {
            let total_bets = self.user_total_bets.read(user);
            let total_wins = self.user_total_wins.read(user);
            let total_rewards = self.user_total_rewards.read(user);
            (total_bets, total_wins, total_rewards)
        }

        fn get_bet(
            self: @ContractState, event_id: u256, user: ContractAddress,
        ) -> (felt252, u256, bool) {
            let outcome = self.bet_outcomes.read((event_id, user));
            let amount = self.bet_amounts.read((event_id, user));
            let claimed = self.bet_claimed.read((event_id, user));
            (outcome, amount, claimed)
        }

        fn get_event_counter(self: @ContractState) -> u256 {
            self.event_counter.read()
        }

        fn get_contract_balance(self: @ContractState) -> u256 {
            IERC20Dispatcher { contract_address: STRK_ADDRESS() }.balance_of(get_contract_address())
        }

        fn get_event_bets(
            self: @ContractState, event_id: u256,
        ) -> Array<(ContractAddress, felt252, u256)> {
            let mut bets = ArrayTrait::new();
            let participants_len = self.event_participants.entry(event_id).len();

            for i in 0..participants_len {
                let participant = self.event_participants.entry(event_id).at(i).read();
                let outcome = self.bet_outcomes.read((event_id, participant));
                let amount = self.bet_amounts.read((event_id, participant));
                bets.append((participant, outcome, amount));
            }

            bets
        }

        // Write functions
        fn create_event(
            ref self: ContractState, description: felt252, outcomes: Array<felt252>, deadline: u64,
        ) -> u256 {
            let caller = get_caller_address();
            let current_time = get_block_timestamp();

            assert(deadline > current_time, 'Deadline must be in future');
            assert(outcomes.len() >= 2, 'Need at least 2 outcomes');

            let event_id = self.event_counter.read() + 1;
            self.event_counter.write(event_id);

            // Store event data
            self.event_creators.write(event_id, caller);
            self.event_descriptions.write(event_id, description);
            self.event_deadlines.write(event_id, deadline);
            self.event_resolved.write(event_id, false);
            self.event_total_bets.write(event_id, 0);

            // Store outcomes
            let mut i = 0;
            for outcome in outcomes {
                self.event_outcomes.entry(event_id).append().write(outcome);
                i += 1;
            }

            self
                .emit(
                    EventCreated {
                        event_id, creator: caller, description, deadline, timestamp: current_time,
                    },
                );

            event_id
        }

        fn place_bet(ref self: ContractState, event_id: u256, outcome: felt252, amount: u256) {
            let caller = get_caller_address();
            let current_time = get_block_timestamp();

            // Validate event exists and is active
            let creator = self.event_creators.read(event_id);
            // assert(creator.is_non_zero(), 'Event does not exist');

            let deadline = self.event_deadlines.read(event_id);
            assert(current_time < deadline, 'Betting period ended');

            let resolved = self.event_resolved.read(event_id);
            assert(!resolved, 'Event already resolved');

            assert(amount > 0, 'Bet amount must be positive');

            // Validate outcome exists for this event
            let mut valid_outcome = false;
            let outcomes_len = self.event_outcomes.entry(event_id).len();
            for i in 0..outcomes_len {
                if self.event_outcomes.entry(event_id).at(i).read() == outcome {
                    valid_outcome = true;
                    break;
                }
            }
            assert(valid_outcome, 'Invalid outcome');

            // Check if user already has a bet on this event
            let existing_bet = self.bet_amounts.read((event_id, caller));
            assert(existing_bet == 0, 'User already has a bet');

            // Transfer tokens from user to contract
            let token = IERC20Dispatcher { contract_address: STRK_ADDRESS() };
            let success = token.transfer_from(caller, get_contract_address(), amount);
            assert(success, 'Token transfer failed');

            // Store bet
            self.bet_outcomes.write((event_id, caller), outcome);
            self.bet_amounts.write((event_id, caller), amount);
            self.bet_claimed.write((event_id, caller), false);

            // Update totals
            let total_bets = self.event_total_bets.read(event_id);
            self.event_total_bets.write(event_id, total_bets + amount);

            let outcome_total = self.outcome_totals.read((event_id, outcome));
            self.outcome_totals.write((event_id, outcome), outcome_total + amount);

            // Add to participants
            self.event_participants.entry(event_id).append().write(caller);

            // Update user stats
            let user_bets = self.user_total_bets.read(caller);
            self.user_total_bets.write(caller, user_bets + amount);

            self
                .emit(
                    BetPlaced { event_id, user: caller, outcome, amount, timestamp: current_time },
                );
        }

        fn resolve_event(ref self: ContractState, event_id: u256, winning_outcome: felt252) {
            self.ownable.assert_only_owner();

            // Validate event exists and can be resolved
            let creator = self.event_creators.read(event_id);
            // assert(creator.is_non_zero(), 'Event does not exist');

            let resolved = self.event_resolved.read(event_id);
            assert(!resolved, 'Event already resolved');

            let deadline = self.event_deadlines.read(event_id);
            let current_time = get_block_timestamp();
            assert(current_time >= deadline, 'Event not yet ended');

            // Validate winning outcome
            let mut valid_outcome = false;
            let outcomes_len = self.event_outcomes.entry(event_id).len();
            for i in 0..outcomes_len {
                if self.event_outcomes.entry(event_id).at(i).read() == winning_outcome {
                    valid_outcome = true;
                    break;
                }
            }
            assert(valid_outcome, 'Invalid winning outcome');

            // Mark as resolved
            self.event_resolved.write(event_id, true);
            self.event_winning_outcomes.write(event_id, winning_outcome);

            let total_bets = self.event_total_bets.read(event_id);

            self
                .emit(
                    EventResolved {
                        event_id, winning_outcome, total_bets, timestamp: current_time,
                    },
                );
        }

        fn claim_reward(ref self: ContractState, event_id: u256) -> u256 {
            let caller = get_caller_address();

            // Validate event is resolved
            let resolved = self.event_resolved.read(event_id);
            assert(resolved, 'Event not resolved');

            // Check if user has a bet
            let bet_amount = self.bet_amounts.read((event_id, caller));
            assert(bet_amount > 0, 'No bet found');

            // Check if already claimed
            let claimed = self.bet_claimed.read((event_id, caller));
            assert(!claimed, 'Reward already claimed');

            let user_outcome = self.bet_outcomes.read((event_id, caller));
            let winning_outcome = self.event_winning_outcomes.read(event_id);

            let mut reward = 0;

            if user_outcome == winning_outcome {
                // Calculate reward
                let total_bets = self.event_total_bets.read(event_id);
                let winning_total = self.outcome_totals.read((event_id, winning_outcome));

                if winning_total > 0 {
                    // Calculate house fee
                    let house_fee = total_bets * HOUSE_FEE / PERCENTAGE_BASE;
                    let prize_pool = total_bets - house_fee;

                    // User's share of the prize pool
                    reward = prize_pool * bet_amount / winning_total;
                }

                // Update user stats
                let user_wins = self.user_total_wins.read(caller);
                self.user_total_wins.write(caller, user_wins + 1);

                let user_rewards = self.user_total_rewards.read(caller);
                self.user_total_rewards.write(caller, user_rewards + reward);
            }

            // Mark as claimed
            self.bet_claimed.write((event_id, caller), true);

            // Transfer reward if any
            if reward > 0 {
                let token = IERC20Dispatcher { contract_address: STRK_ADDRESS() };
                let success = token.transfer(caller, reward);
                assert(success, 'Reward transfer failed');

                self
                    .emit(
                        RewardClaimed {
                            event_id, user: caller, reward, timestamp: get_block_timestamp(),
                        },
                    );
            }

            reward
        }

        fn withdraw(ref self: ContractState, amount: u256) {
            self.ownable.assert_only_owner();

            let token = IERC20Dispatcher { contract_address: STRK_ADDRESS() };
            let success = token.transfer(self.ownable.owner(), amount);
            assert(success, 'Withdrawal failed');
        }
    }
}
