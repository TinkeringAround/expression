import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Template, TemplateDescriptions } from '../../../store/phraser/types';
import { RhymeTransform } from '../../../lib/rhyme/transform';

import Templates from './index';

import { AppMock } from '../../../mock/components';

describe('Templates', () => {
  const TemplatesInApp = (
    <AppMock>
      <DragDropContext onDragEnd={() => {}}>
        <Templates />
      </DragDropContext>
    </AppMock>
  );

  it('should render all templates', () => {
    const templates = Object.keys(Template);

    render(TemplatesInApp);

    templates.every(template => {
      expect(screen.getByText(template)).toBeInTheDocument();
      expect(
        screen.getByText(TemplateDescriptions[RhymeTransform.toTemplate(template)])
      ).toBeInTheDocument();
    });
  });
});
