
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    syncCartToFirestore,
} from '../redux/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';
import Preloader from '../utils/preloader';
import { useNavigate } from 'react-router';

const CartPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const items = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);
    const error = useSelector((state) => state.cart.error);
    const viewed = useSelector((state) => state.cart.viewed);
    let navigate = useNavigate();

    const goToItemPage = (item) => {
        if(item.type === 'plants'){
            navigate(`/plants/${item.id}`)
        } else{
            navigate(`/bouquets/${item.id}`) 
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

        const totalPrice = items.reduce((sum, item) => {
        const basePrice = item.price * item.quantity; 
        const packingPrice = item.additionalOptions?.packing?.price || 0; 
        return sum + basePrice + (packingPrice * item.quantity);
    }, 0);

    const shipping = () => (totalPrice < 150 ? 4.99 : 0);

    let finalPrice = totalPrice + shipping()

    if (loading) return <Preloader />;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p className='w-full bg-bezchBase1/40 py-2 px-4 text-gold'>Please log in to access your cart.</p>;
    if (!items.length) return <p className='w-full bg-bezchBase1/40 py-2 px-4 text-gold'>Your cart is empty.</p>;

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
        dispatch(syncCartToFirestore({ userId: user.uid }));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
        dispatch(syncCartToFirestore({ userId: user.uid }));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
        dispatch(syncCartToFirestore({ userId: user.uid }));
    };

    return (
        <section className='w-full bg-bezchBase1/40 py-2 px-4 text-gold'>
            <h2 className="text-xl font-bold text-start p-4">Cart ({items.length})</h2>
            <div className="flex flex-col md:flex-row gap-4">
                {/* block with items array */}
                <div className='flex-[2.3]'>

                    <ul className='flex flex-col gap-3'>
                        {items.map((item, index) => (
                            <li
                                key={`${item.id}-${item.type}`} // unic key
                                className="border bg-white/50 flex gap-2 md:gap-10 items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-[200px] h-auto object-cover"
                                />
                                <div className='text-lg'>
                                    <h3 className="text-xl font-semibold py-4 w-full block truncate">{item.name}</h3>
                                    <p >Price: €{item.price}</p>
                                    {item.additionalOptions?.packing && (
                                        <p>
                                            Packing: {item.additionalOptions.packing.name} — €{item.additionalOptions.packing.price}
                                        </p>
                                    )}
                                    <div className="bg-bezchBase2/40 inline-block border border-bezchDark/80 font-semibold">
                                        <button
                                            onClick={() => handleDecrement(item.id)}
                                            className="py-1 px-3 bg-bezchBase2/60 border-r border-bezchDark/80"
                                        >
                                            -
                                        </button>
                                        <span className='py-1 px-3'>{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrement(item.id)}
                                            className="py-1 px-3 bg-bezchBase2/60 border-l border-bezchDark/80"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="flex items-center mt-2"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <TrashIcon className="w-6 h-6 mr-1" /> Remove
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>

                </div>
                {/* total calculations */}
                <div className="flex-[1.3] flex flex-col rounded-lg py-2 px-8 bg-white/50">
                    <div className='flex justify-between'>
                        <span className="text-lg text-start">Subtotal:</span>
                        <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between my-1'>
                        <span className="text-lg text-start">Shipping:</span>
                        <span>{shipping() === 0 ? 'free' : '€4.99'}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className="text-xl font-bold text-start uppercase">Total: </span>
                        <span className='text-xl font-bold'>€{finalPrice.toFixed(2)}</span>
                    </div>
                    <span className='text-sm'>Taxes included</span>
                    <button className='border border-gold py-3 my-4 text-lg uppercase font-semibold'>Proceed with payment</button>
                    <p>Free shipping from €150</p>
                </div>

            </div>
            {/* block localStorage*/}
            <div className="py-4">
                <h2 className="uppercase">Previously admired by you</h2>
                <div className="relative w-full overflow-hidden">
                    <ul className="flex gap-4 py-3 w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-transparent snap-x snap-mandatory">
                        {viewed.map((item, idx) => (
                            <li onClick={() => goToItemPage(item)} key={idx} className="bg-white cursor-pointer flex-shrink-0 min-w-[150px] max-w-[150px] snap-start">
                                <img src={item.image} alt="" className="h-[180px] w-[150px] object-cover" />
                                <p className="text-sm px-2 w-full block truncate">{item.name}</p>
                                <p className="text-sm px-2">€{item.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
