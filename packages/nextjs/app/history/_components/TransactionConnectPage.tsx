import ConnectModal from '~~/components/scaffold-stark/CustomConnectButton/ConnectModal';
import { useAccountConnection } from '~~/hooks/starkcade/useAccountConnection';

type Props = {}

const TransactionConnectPage = (props: Props) => {
      const { status } = useAccountConnection();
    
      const handleConnect = () => {
        console.log(status);
      };
  return (
    <div className='relative flex flex-col justify-center items-center pb-20'>
      <div className="flex flex-col text-center gap-8 items-center py-20 justify-center mt-6">
        <h2 className='text-4xl'>To view all your transactions</h2>
        <button
          className="w-64 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

export default TransactionConnectPage