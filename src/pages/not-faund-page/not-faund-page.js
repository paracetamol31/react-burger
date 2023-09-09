import notFaundPageStyles from "./not-faund-page.module.css";

export const NotFaundPage = () => {
    return (
        <section className={notFaundPageStyles.pageWrapper}>
            <span className={`${notFaundPageStyles.code} text text_type_main-default mb-20`}>404</span>
            <span className={`${notFaundPageStyles.text} text text_type_main-medium`}>Вы достигли горизонта событий!</span>
        </section>
    );
}