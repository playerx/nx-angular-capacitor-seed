import { chain, externalSchematic, Rule, Tree, SchematicsException } from "@angular-devkit/schematics"
import * as path from 'path'
import { getWorkspace } from '../utility/workspace'
import { strings } from '@angular-devkit/core';

export default function (schema: any): Rule {

  return async (host: Tree) => {

    const workspace = await getWorkspace(host);
    const project = workspace.projects.get(schema.project as string);
    if (!project) {
      throw new SchematicsException(`Invalid project name (${schema.project})`);
    }

    const projectType = project.extensions['projectType']
    console.log('projectType', projectType, typeof projectType)

    if (!['application', 'library'].includes(projectType.toString())) {
      throw new SchematicsException(`Invalid project type in angular.json, allowed: [application, library]`);
    }

    let pathUrl

    if (projectType === 'application') {
      pathUrl = path.join(
        'apps',
        schema.project,
        'src',
        'app',
      )
    }

    if (projectType === 'library') {
      pathUrl = path.join(
        'libs',
        schema.project,
        'src',
        'lib',
      )
    }

    return chain([
      createStorybookFile(pathUrl, schema.name),
      externalSchematic("@schematics/angular", "component", {
        project: schema.project,
        name: schema.name,
        path: pathUrl,
        skipImport: true,
        skipTests: true,
        styleext: 'scss',
      })
    ])
  }
}

function createStorybookFile(pathUrl, name) {
  return (tree: Tree) => {

    const classifiedName = strings.classify(`${name}Component`);

    const fullPath = path.join(pathUrl, name, name + '.stories.ts')
    const content = `import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ${classifiedName} } from './${name}.component';

storiesOf('${classifiedName}', module)
  .add('to Storybook', () => ({
    component: ${classifiedName},
    props: {
      click: action('clicked'),
    },
  }));
  `

    tree.create(fullPath, content)

    return tree
  }
}
