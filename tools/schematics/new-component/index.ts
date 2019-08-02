import { chain, externalSchematic, Rule, Tree, SchematicsException } from "@angular-devkit/schematics"
import * as path from 'path'
import { getWorkspace } from '../utility/workspace'
import { strings } from '@angular-devkit/core';
import { parseName } from '../utility/parseName';

export default function (schema: any): Rule {

  return async (host: Tree) => {

    const workspace = await getWorkspace(host);
    const project = workspace.projects.get(schema.project as string);
    if (!project) {
      throw new SchematicsException(`Invalid project name (${schema.project})`);
    }

    const projectType = project.extensions['projectType']

    if (!['application', 'library'].includes(projectType.toString())) {
      throw new SchematicsException(`Invalid project type in angular.json, allowed: [application, library]`);
    }

    let basePathUrl

    if (projectType === 'application') {
      basePathUrl = path.join(
        'apps',
        schema.project,
        'src',
        'app',
      )
    }

    if (projectType === 'library') {
      basePathUrl = path.join(
        'libs',
        schema.project,
        'src',
        // 'lib',
      )
    }

    const { name, path: pathUrl } = parseName(basePathUrl, schema.name)

    return chain([
      createStorybookFile(pathUrl, name),
      externalSchematic("@schematics/angular", "component", {
        project: schema.project,
        name,
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

    const pureName = strings.dasherize(name)
    const classifiedName = strings.classify(`${pureName}Component`);

    const fullPath = path.join(pathUrl, name, pureName + '.stories.ts')

    const content = `import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ${classifiedName} } from './${name}.component';

storiesOf('${classifiedName}', module)
  .add('normal', () => ({
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
