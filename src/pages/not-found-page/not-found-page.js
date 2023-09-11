import notFoundPageStyles from "./not-found-page.module.css";

export const NotFoundPage = () => {
    return (
        <section className={notFoundPageStyles.pageWrapper}>
            <span className={`${notFoundPageStyles.code} text text_type_main-default mb-20`}>404</span>
            <span className={`${notFoundPageStyles.text} text text_type_main-medium`}>Вы достигли горизонта событий!</span>
        </section>
    );
}