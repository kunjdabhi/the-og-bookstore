
import CartObject from '../Components/CartObject';

const Cart = () => {
    return (
        // <div className='flex content center relative'>
        //     <h1 className='translate-y-[22.5rem] mx-auto font-bold text-[2rem] text-[#384749]'>Cart is Empty</h1>
        // </div>
        <div className="translate-y-20 flex flex-col items-center content-center gap-6">
            <CartObject />
            
        </div>
    )
}

export default Cart;