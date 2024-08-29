# Web Interview Fullstack

## Run tasks

To run tasks with Nx use:

```sh
npx nx <target> <project-name>
```

## Development

```sh
# Run the server
npx nx serve server
nx run server:test # to run tests

# Run web
npx nx serve web

# Run storybook
npx nx run feature-ui:storybook
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.
