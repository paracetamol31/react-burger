import { FC, ReactNode } from "react";
import roundImageStyle from "./round-image.module.css";

export interface IPropsRoundImage {
    src: string,
    size: number,
    index?: number,
    extraStyle?: React.CSSProperties,
    children?: ReactNode
}

export const RoundImage: FC<IPropsRoundImage> = ({ size, src, index, extraStyle = {}, children = null }) => {
    return (
        <section
            className={roundImageStyle.roundImageWrapper}
            style={{
                zIndex: index ?? "auto",
                maxWidth: `${size}px`,
                maxHeight: `${size}px`,
                ...extraStyle
            }}
        >
            <div className={roundImageStyle.containerForContent}>
                <img
                    src={src}
                    className={roundImageStyle.roundImage}
                    alt="img"
                />
                <div className={roundImageStyle.containerForChildren}>
                    {children}
                </div>
            </div>
        </section>
    )
}