
# Development

## Technologies
- [Svelte JS](https://svelte.dev/)
- Javascript

## Requirements:
- nodejs
- npm

1) Clone the repository...

```bash
git clone https://github.com/jashort/canvas-omnibus.git
```

2) Install the dependencies...

```bash
cd canvas-omnibus
npm install
```

3) Start the development [Rollup](https://rollupjs.org):

```bash
npm run dev
```

4) Navigate to [localhost:5000](http://localhost:5000).

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```
