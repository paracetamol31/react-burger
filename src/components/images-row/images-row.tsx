import { RoundImage } from "../round-image/round-image";
import imagesRowStyles from "./images-row.module.css";

import { FC } from "react";

export interface ImagesRowProps {
    images: Array<string>,
    quantityShowedImages?: number
}

export const ImagesRow: FC<ImagesRowProps> = ({ images, quantityShowedImages = 6 }) => {
    const roundImages: Array<JSX.Element> = [];
    if (images.length < quantityShowedImages) {
        quantityShowedImages = images.length
    }
    for (let i = 0; i < quantityShowedImages; i++) {
        roundImages.push(
            <>
                <RoundImage size={64} src={images[i]} index={quantityShowedImages - i} key={i} extraStyle={{ right: `${i * 20}px` }}>
                    {(i === quantityShowedImages - 1 && quantityShowedImages < images.length) &&
                        <div
                            className={`${imagesRowStyles.numberRemainingElements} text text_type_main-small`}
                        >
                            +{images.length - quantityShowedImages}
                        </div>}
                    
                </RoundImage>

            </>
        );
    }
    return (
        <section className={imagesRowStyles.wrapper}>
            {roundImages}
        </section>
    )
}