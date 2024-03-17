<b>UNIVERSITE DU HAVRE NORMANDIE</b>
INTEGRANTS :
- Andoni ALONSO TORT
- Rafik TEKFA
- Fouad TEKFA
- Salim Mahdjane

<h1 align="center"><a href="https://api-platform.com"><img src="https://api-platform.com/images/logos/Logo_Circle%20webby%20text%20blue.png" alt="API Platform" width="250" height="250"></a></h1>

API Platform is a next-generation web framework designed to easily create API-first projects without compromising extensibility
and flexibility:

* Design your own data model as plain old PHP classes or [**import an existing ontology**](https://api-platform.com/docs/schema-generator).
* **Expose in minutes a hypermedia REST or a GraphQL API** with pagination, data validation, access control, relation embedding,
  filters, and error handling...
* Benefit from Content Negotiation: [GraphQL](https://api-platform.com/docs/core/graphql/), [JSON-LD](https://json-ld.org), [Hydra](https://hydra-cg.com),
  [HAL](https://github.com/mikekelly/hal_specification/blob/master/hal_specification.md), [JSON:API](https://jsonapi.org/), [YAML](https://yaml.org/), [JSON](https://www.json.org/), [XML](https://www.w3.org/XML/) and [CSV](https://www.ietf.org/rfc/rfc4180.txt) are supported out of the box.
* Enjoy the **beautiful automatically generated API documentation** ([OpenAPI](https://api-platform.com/docs/core/openapi/)).
* Add [**a convenient Material Design administration interface**](https://api-platform.com/docs/admin) built with [React](https://reactjs.org/)
  without writing a line of code.
* **Scaffold fully functional Progressive-Web-Apps and mobile apps** built with [Next.js](https://api-platform.com/docs/client-generator/nextjs/) (React),
[Nuxt.js](https://api-platform.com/docs/client-generator/nuxtjs/) (Vue.js) or [React Native](https://api-platform.com/docs/client-generator/react-native/)
thanks to [the client generator](https://api-platform.com/docs/client-generator/) (a Vue.js generator is also available).
* Install a development environment and deploy your project in production using **[Docker](https://api-platform.com/docs/distribution)**
and [Kubernetes](https://api-platform.com/docs/deployment/kubernetes).
* Easily add **[OAuth](https://oauth.net/) authentication**.
* Create specs and tests with **[a developer friendly API testing tool](https://api-platform.com/docs/distribution/testing/)**.

The official project documentation is available **[on the API Platform website](https://api-platform.com)**.

API Platform embraces open web standards and the
[Linked Data](https://www.w3.org/standards/semanticweb/data) movement. Your API will automatically expose structured data.
It means that your API Platform application is usable **out of the box** with technologies of
the semantic web.

It also means that **your SEO will be improved** because **[Google leverages these formats](https://developers.google.com/search/docs/guides/intro-structured-data)**.

Last but not least, the server component of API Platform is built on top of the [Symfony](https://symfony.com) framework,
while client components leverage [React](https://reactjs.org/) ([Vue.js](https://vuejs.org/) flavors are also available).
It means that you can:

* Use **thousands of Symfony bundles and React components** with API Platform.
* Integrate API Platform in **any existing Symfony, React, or Vue application**.
* Reuse **all your Symfony and JavaScript skills**, and benefit from the incredible amount of documentation available.
* Enjoy the popular [Doctrine ORM](https://www.doctrine-project.org/projects/orm.html) (used by default, but fully optional:
  you can use the data provider you want, including but not limited to MongoDB and Elasticsearch)

## Install

[Read the official "Getting Started" guide](https://api-platform.com/docs/distribution).

## Credits

Created by [Kévin Dunglas](https://dunglas.fr). Commercial support is available at [Les-Tilleuls.coop](https://les-tilleuls.coop).


## Pour coonstruire le projet docker
docker compose build --no-cache

docker compose up --wait

## Details du Projet

<h4>Technologies utilisés</h4>
<ul>
  <li>API Platform</li>
  <li>Symfony</li>
  <li>GraphQl</li>
  <li>Postgresql</li>
  <li>NextJs</li>
  <li>D3.js</li>
</ul>

Ce projet à été réalisé en équipe, pour notre cours du WEB en Master 2 IWOCS, à l'Université du Havre.

Nous avons mis dans le projet back-end (dans le dossier api/), les fichiers de test des valeurs foncieres entre 2018 - 2023 en France.

Pour remplir votre base de données veuillez de lire le Readme dans le projet api/ pour savoir comment faire les migrations.

Une fois qu'on a lancé notre projet et remplit notre base de données on peut aller sur le site, tapez l'adress http://localhost:80

![Init Projet](<./images/1.start.png>)

Une fois dans cette page, vous pouvez cliquer sur le bouton client pour aller directement vers le site.

![Menu](<./images/2.menu.png>)

Si vous allez vers ImmobilieresList on verra la liste de tous les immobilières de notre base de données.

![ImmobilieresList](<./images/3.ImmobilieresList.png>)

Maintenant, allons sur les autres bouttons du menu.

<h4>Ventes Moyennes</h4>

La moyenne de ventes de cheque moi.

![VentesMoyennes](<./images/3.VentesMoyennes.png>)

<h4>Muttations par période</h4>

Pour les mutations, vous pouvez choisir un interval de dates et sélectionner le moide d'affichage
<ul>
  <li>Par jour</li>
  <li>Par Mois</li>
  <li>Par Année</li>
</ul>

![Mutations](<./images/4.MutationsParPeriode.png>)

<h4>Ventes par Région</h4>

Et finalement on a les ventes par région répresentées apr un graphique camamber.

Ici vous pouvez visualiser les différentes régions avec une couleur différent et sélectionner l'année que l'on souahite afficher.

![VentesParRegion](<./images/5.VentesParRegion.png>)
