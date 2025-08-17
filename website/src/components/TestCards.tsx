import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

const TEST_CARDS = [
  {
    brand: "Visa",
    number: "4242 4242 4242 4242",
    cvv: "Any 3 digits",
    date: "Any future date",
    name: "Nadeem Chaudhary",
  },
  {
    brand: "Mastercard",
    number: "5555 5555 5555 4444",
    cvv: "Any 3 digits",
    date: "Any future date",
    name: "Nadeem Chaudhary",
  },
  {
    brand: "American Express",
    number: "3782 822463 10005",
    cvv: "Any 4 digits",
    date: "Any future date",
    name: "Nadeem Chaudhary",
  },
];

const brandStyles: Record<
  string,
  { gradient: string; text: string; logo: string }
> = {
  Visa: {
    gradient: "bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500",
    text: "text-white",
    logo: "VISA",
  },
  Mastercard: {
    gradient: "bg-gradient-to-r from-red-800 via-orange-600 to-yellow-500",
    text: "text-white",
    logo: "Mastercard",
  },
  "American Express": {
    gradient: "bg-gradient-to-r from-teal-700 via-cyan-600 to-blue-500",
    text: "text-white",
    logo: "AMEX",
  },
};

const TestCards = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setCopiedIndex(idx);
    timeoutRef.current = setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="mt-4">
      <div>
        <h2 className="text-4xl font-bold mb-4 text-center">
          Payment Test Cards
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Use the following test cards to simulate successful payments for
          different brands.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEST_CARDS.map((card, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden shadow-2xl ${
              brandStyles[card.brand].gradient
            } ${brandStyles[card.brand].text}`}
          >
            {/* Card design elements */}
            <div className="absolute top-4 left-4 w-12 h-8 bg-gradient-to-r from-amber-200 to-amber-400 rounded-md flex items-center justify-center">
              <div className="w-10 h-1 bg-amber-300 rounded-sm"></div>
            </div>

            <div className="absolute top-4 right-4 font-bold text-xl tracking-wider">
              {brandStyles[card.brand].logo}
            </div>

            <div className="absolute top-16 left-4 w-10 h-0.5 bg-white/30"></div>
            <div className="absolute top-20 left-4 w-6 h-0.5 bg-white/30"></div>

            {/* Card content */}
            <div className="p-6 pt-20">
              <div className="font-mono text-xl tracking-widest mb-8 flex justify-between items-center">
                {card.number}
                <div className="relative">
                  <button
                    onClick={() => handleCopy(card.number, idx)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Copy card number"
                  >
                    {copiedIndex === idx ? (
                      <Check size={18} className="text-green-300" />
                    ) : (
                      <Copy size={18} className="text-white/80" />
                    )}
                  </button>

                  {copiedIndex === idx && (
                    <div className="absolute -top-8 right-0 bg-black/80 text-white text-xs py-1 px-2 rounded-md flex items-center gap-1">
                      <Check size={12} />
                      Copied
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-xs opacity-80 mb-1">VALID THRU</div>
                  <div>{card.date}</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">CVV</div>
                  <div>{card.cvv}</div>
                </div>
              </div>

              {/* Account holder name */}
              <div className="mt-1 font-medium tracking-wider truncate uppercase [text-shadow:1px_1px_1px_white]">
                {card.name}
              </div>
            </div>

            {/* Card hologram */}
            <div className="absolute bottom-4 right-4 w-12 h-8 bg-gradient-to-r from-white/20 to-transparent rounded-md border border-white/20 flex items-center justify-center">
              <div className="w-8 h-6 rounded-sm bg-gradient-to-r from-white/30 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCards;
