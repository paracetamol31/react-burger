import imagesRowStyles from "./images-row.module.css";

import { FC } from "react";

export interface ImagesRowProps {
    images: Array<string>
}

export const ImagesRow: FC<ImagesRowProps> = (props) => {
    return (
        <section className={imagesRowStyles.wrapper}>

        </section>
    )
}