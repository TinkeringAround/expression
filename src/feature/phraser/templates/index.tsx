import React, { FC, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { Template, TemplateDescriptions } from '../../../store/phraser/types';
import { toTemplate } from '../../../lib/rhyme';

import For from '../../../component/for';

import { STemplate, STemplates } from './styled';

export const TEMPLATES = 'templates';

const Templates: FC = () => {
  const [templates] = useState<string[]>(Object.keys(Template));

  return (
    <Droppable droppableId={TEMPLATES}>
      {({ placeholder, innerRef, droppableProps }) => (
        <STemplates ref={innerRef} {...droppableProps}>
          <h1>Templates</h1>
          <p>Add Templates of Rhyme blocks to parts of a selected song.</p>
          <For
            values={templates}
            projector={(template, index) => (
              <Draggable key={template} draggableId={template} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <STemplate ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <h4>{template}</h4>
                    <p>{TemplateDescriptions[toTemplate(template)]}</p>
                  </STemplate>
                )}
              </Draggable>
            )}
          />
          {placeholder}
        </STemplates>
      )}
    </Droppable>
  );
};

export default Templates;
