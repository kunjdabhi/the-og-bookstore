

const CartObject = () => {
    const arr = [1,2,3,4,5,6,7,8,9];
    return (
        <div className=" w-[80%] h-content flex text-[#384749]">
            <img src="https://upload.wikimedia.org/wikipedia/en/9/95/TheMidnightStar.jpeg" className="w-40 rounded-md" />
            <div className="ml-4 mt-6">
                <p className="font-semibold text-xl">The Midnight Star</p>
                <span>Quantity:</span>
                <select name='qty' className="mt-2 ml-2">
                    {arr.map((i)=>{
                        return(
                            <option value={i}>{i}</option>
                        )
                    })}
                </select>
            </div>
        </div>
  )
}

export default CartObject;