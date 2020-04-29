import Head from 'next/head'
import { request } from '../../lib/datocms'
import { DiscussionEmbed } from 'disqus-react'

const ALL_DISHES_QUERY = `query AllDishes {
    allDishes {
        id
        slug
      }
}`

const DISH_QUERY = `query Dish($slug: String) {
    dish(filter: {slug: {eq: $slug} }) {
        id
        name
        dishType
        slug
        stats {
            group
            fat
            carbs
            proteins
            kcal
        }
      }
}`

export async function getStaticProps({ params }) {
    const data = await request({
        query: DISH_QUERY,
        variables: { slug: params.slug },
    })
    return {
        props: { slug: params.slug, data },
    }
}

export async function getStaticPaths() {
    const data = await request({
        query: ALL_DISHES_QUERY,
    })
    return {
        paths: data.allDishes.map((dish) => ({
            params: { slug: dish.slug },
        })),
        fallback: false,
    }
}

const times = {
    breakfast: '9:00 - 10:00',
    snack1: '11:00 - 12:00',
    lunch: '14:00 - 15:00',
    snack2: '16:00 - 17:00',
    supper: '19:00 - 20:00',
}

const Dish = ({ slug, data }) => {
    const { dish } = data
    return (
        <div className="container">
            <Head>
                <title>NutritionPro Menu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">NutritionPro Menu</h1>
                <h3>{dish.name}</h3>
                <p>
                    {times[dish.dishType]} {dish.dishType}
                </p>
                <p>
                    {`kCal: ${dish.stats[0].kcal}, fats: ${dish.stats[0].fat}, carbs: ${dish.stats[0].carbs}, proteins: ${dish.stats[0].proteins}`}{' '}
                </p>
                <div className="comments">
                    <DiscussionEmbed
                        shortname="restaurant-menu-test"
                        // change it to your website shortname (restaurant-menu-test part of  https://restaurant-menu-test.disqus.com/ in my case)
                        config={{
                            url: `https://restaurant-menu-test.com/subfolder/dish/${dish.slug}`,
                            // change it to your domain that you add in discus settings ( in this case it is https://restaurant-menu-test.com/subfolder)
                            identifier: dish.id,
                            title: dish.name,
                        }}
                    />
                </div>
            </main>

            <footer>
                <a
                    href="https://www.linkedin.com/in/alex-alexeev-ma-62550a1b/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Made by Alex Alexeev
                </a>
            </footer>

            <style jsx>{`
                .comments {
                    max-width: 100%;
                    min-width: 60%;
                }
                .container {
                    width: 100%;
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
                    width: 100%;
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;

                    align-items: center;
                }

                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a {
                    color: inherit;
                    text-decoration: none;
                }

                .title a {
                    color: #0070f3;
                    text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                    text-decoration: underline;
                }

                .title {
                    margin: 0;
                    line-height: 1.15;
                    font-size: 4rem;
                }

                .title,
                .description {
                    text-align: center;
                }

                .description {
                    line-height: 1.5;
                    font-size: 1.5rem;
                }

                .grid {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    width: 100%;
                    max-width: 800px;
                    margin-top: 3rem;
                }

                .card {
                    margin: 1rem;
                    flex-basis: 100%;
                    padding: 1.5rem;
                    text-align: left;
                    color: inherit;
                    text-decoration: none;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                    color: #0070f3;
                    border-color: #0070f3;
                }

                .card h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.25rem;
                }

                .card p {
                    margin: 0;
                    font-size: 1rem;
                    line-height: 1.25;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }

                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    )
}

export default Dish
