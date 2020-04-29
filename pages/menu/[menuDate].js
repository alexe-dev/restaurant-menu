import Head from 'next/head'
import { format, subDays, addDays, eachDayOfInterval } from 'date-fns'
import { request } from '../../lib/datocms'

const MENU_QUERY = `query MenuPage($date: Date) {
  dailyMenu(filter: {menuDate: {eq: $date} }) {
    id
    menuDate
    dishes {
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
  }
}`

const today = new Date()

export async function getStaticProps({ params }) {
    const data = await request({
        query: MENU_QUERY,
        variables: { date: params.menuDate },
    })
    return {
        props: { data, date: params.menuDate },
    }
}

export async function getStaticPaths() {
    const dates = eachDayOfInterval({
        start: subDays(new Date(), 30),
        end: addDays(new Date(), 2),
    })
    return {
        paths: dates.map((date) => ({
            params: { menuDate: format(date, 'yyyy-MM-dd') },
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

const MenuDate = ({ data, date }) => {
    const menu = data && data.dailyMenu
    const yesterdayString = new Date(Date.parse(date) - 86400000)
        .toISOString()
        .substr(0, 10)
    const tomorrowString = new Date(Date.parse(date) + 86400000)
        .toISOString()
        .substr(0, 10)
    return (
        <div className="container">
            <Head>
                <title>Nutrition Pro Menu</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">NutritionPro Menu</h1>

                <p className="description">
                    <a href={`/menu/${yesterdayString}`}>{'<< '}</a>
                    Date: {date}
                    <a href={`/menu/${tomorrowString}`}>{' >>'}</a>
                </p>
                {menu ? (
                    <div className="grid">
                        {menu.dishes.map((dish) => (
                            <a
                                href={`/dish/${dish.slug}`}
                                className="card"
                                key={dish.id}
                            >
                                <p>
                                    {times[dish.dishType]} {dish.dishType}
                                </p>
                                <h3>{dish.name}</h3>
                                <p>
                                    {`kCal: ${dish.stats[0].kcal}, fats: ${dish.stats[0].fat}, carbs: ${dish.stats[0].carbs}, proteins: ${dish.stats[0].proteins}`}
                                </p>
                            </a>
                        ))}
                    </div>
                ) : (
                    'There is no menu published for this day yet'
                )}
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
                .container {
                    min-height: 100vh;
                    padding: 0 0.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                main {
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

export default MenuDate
