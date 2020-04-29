You can use this app to allow users of you restaurant or food delivery service to give you feedback on concrete dishes.

The tech stack includes Next.js, React and GraphQL(api is provided by DatoCMS).

For simplicity and less development time I used Disqus comments system but you can implement you proprietary system. You can use my config for testing but change it for your needs (see comments in file pages/dish/[slug].js)

For publishing new menus and dishes DatoCMS is used (it is UI friendly admin panel that your managers can use without knowing any pogramming).

You should provide your DatoCMS API token (read only) in next.config.js.

(you will se my token there, I added a small menu for date 2020-04-09 there so you can test it with my token first and change it to yours after you create your DatoCMS account and add content models which i describe below).

It is possible to generate a static website to host it easily(see steps below to generate it) or host a dynamic version.

Take into account that this is very early version of the project, styles are very simplistic and use styled-jsx as a solution coming with next.js, there are no tests as well as typings (I did not use typescript here but will use if I continue to develop the project).
There is also quite a lot of duplication in the code: pages/index.js(which defaults to the menu for current date) is quite same as pages/menu/[menuDate].js(which loads the menu for a date from url), and styles are basically copy-pasted there as well as in pages/dish/[slug].js. Next step would be to intoduce a layot component and make index.js just to import component from pages/menu/[menuDate].js and provide it with current date as a prop. Feel free to contribute :)

## DatoCMS models

In DatoCMS you need to add "Menu Day" and "Dish" models to be able to add new content.

General annotation:

![](/models_schemes/db_annotation.png)

Menu Day model (screenshot from DatoCMS):

![](/models_schemes/menu_model.png)

Dish model:

![](/models_schemes/dish_model.png)

Stats submodel(this model is not necessary if you do not want to show this info but you may need to remove some code accordingly):

![](/models_schemes/stats_model.png)

## Development and building for production

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to generate and preview static version (works very fast in production, hosted very easily and cheap, very seo friendly):

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

you can host static build at netlify, zeit, Amazon S3 or any other static hosting solutions

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
