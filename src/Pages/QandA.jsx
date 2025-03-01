import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import bgOrchid from '../assets/40399862_8291632.jpg'
const QandA = () => {
    const FAQs = [
        {
            question: "How long do your bouquets stay fresh?",
            answer: "Our bouquets typically stay fresh for 5–7 days with proper care. Replace the water daily, trim the stems diagonally, and keep the bouquet in a cool place away from direct sunlight.",
        },
        {
            question: "Can I schedule a delivery for a specific date?",
            answer: "Yes, you can select your preferred delivery date during checkout. We recommend ordering in advance to ensure availability on special occasions.",
        },
        {
            question: "Are your materials eco-friendly?",
            answer: "Absolutely! We use recyclable packaging and strive to minimize our environmental impact by sourcing flowers locally whenever possible.",
        },
        {
            question: "Do you offer custom bouquets?",
            answer: "Yes, we specialize in custom arrangements. Contact us through our website or call our team, and we'll help you create a bouquet tailored to your needs.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept major credit and debit cards, online payment services like PayPal, and bank transfers. Payment options are displayed during checkout.",
        },
        {
            question: "What if my bouquet is damaged upon arrival?",
            answer: "If your bouquet arrives damaged, please contact us within 24 hours. We'll either replace the bouquet free of charge or provide a full refund.",
        },
        {
            question: "Do you deliver flowers internationally?",
            answer: "Currently, we only deliver within [your country or region]. However, we are exploring international delivery options to serve you better in the future.",
        },
        {
            question: "How do I care for my bouquet?",
            answer: "Trim the stems at an angle, change the water daily, and remove any leaves below the waterline. Add flower food provided with your bouquet to keep it fresh longer.",
        },
        {
            question: "Do you offer same-day delivery?",
            answer: "Yes, we provide same-day delivery for orders placed before 12:00 PM. Delivery availability depends on your location.",
        },
    ];
    const [flippedStates, setFlippedStates] = useState(Array(FAQs.length).fill(false));

       const handleFlip = (index) => {
        const newFlippedStates = [...flippedStates];
        newFlippedStates[index] = !newFlippedStates[index];
        setFlippedStates(newFlippedStates);
    };

    return (
        <div className='px-4 md:px-14 py-8 w-full bg-bezchBase2/40'>
            <h2 className="text-xl font-bold text-center text-gold mb-6">Frequently Asked Questions</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-8'>
                {FAQs.map((item, idx) =>
                    <ReactCardFlip key={idx} isFlipped={flippedStates[idx]} flipDirection='horizontal'>
                        <div className="px-2 h-[250px] w-full rounded-lg shadow-lg flex items-center justify-center text-greenDark text-lg font-semibold cursor-pointer shadow-bezchDark/80 "
                        style={{
                                backgroundImage: `url(${bgOrchid})`,
                                backgroundSize: "cover", 
                                backgroundPosition: "center", 
                                backgroundRepeat: "no-repeat", 
                              }}
                        onClick={() => handleFlip(idx)}>
                         {item.question}
                        </div>
                        <div className="h-[250px] w-full bg-bezchBase2/70 text-headerDark/80 rounded-lg shadow-lg flex items-center justify-center text-lg cursor-pointer font-semibold  text-center px-4 shadow-greenBase-500  shadow-bezchDark/80"
                        onClick={() => handleFlip(idx)}>
                          {item.answer}
                        </div>
                    </ReactCardFlip>
                )}
            </div>
        </div>
    )
}

export default QandA
