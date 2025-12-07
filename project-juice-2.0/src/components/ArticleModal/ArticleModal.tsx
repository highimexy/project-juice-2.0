import React, { useEffect, useState } from "react";
import { BasicTile } from "../BasicTile/BasicTile.tsx";
import { IoClose } from "react-icons/io5";
import "./ArticleModal.css";

interface ArticleCard {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  article: string;
  articleImg: string;
}

interface ArticleModalProps {
  card: ArticleCard;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ card, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const ANIMATION_DURATION = 250;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const backdropClass = `
    fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl p-4
    ${isClosing ? "modal-backdrop-down" : "modal-backdrop"} 
  `;

  const modalContentClass = `
    relative
    bg-transparent
    max-w-full
    ${isClosing ? "modal-content-down" : "modal-content"} 
  `;

  return (
    <div className={backdropClass} onClick={handleClose}>
      <div className={modalContentClass} onClick={(e) => e.stopPropagation()}>
        <BasicTile>
          <div className="max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="
              absolute
              top-4
              right-4
              text-[#640577]
              transition
              z-10
            "
              aria-label="Zamknij modal"
            >
              <IoClose size={30} />
            </button>
            <div className="flex flex-col md:flex-row gap-4 pt-4 text-center">
              <div className="flex justify-center md:block">
                <img
                  src={card.articleImg}
                  alt={card.title}
                  className="rounded-2xl border-2 border-gray-500 max-w-full h-auto md:w-160 md:h-[500px] object-cover mx-auto"
                />
              </div>
              <div className="flex flex-col text-left">
                <h2 className="mb-4 text-4xl font-bold text-[#640577] text-center md:text-left">
                  {card.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-700">
                  {card.article}
                </p>
              </div>
            </div>
          </div>
        </BasicTile>
      </div>
    </div>
  );
};

export default ArticleModal;
