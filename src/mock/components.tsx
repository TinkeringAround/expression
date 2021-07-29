import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { theme } from '../theme';

export const AppMock: FC = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
);

export const DragDropDroppableWrapper: FC = ({ children }) => (
  <DragDropContext onDragEnd={() => {}}>
    <Droppable droppableId="1">
      {({ placeholder, innerRef, droppableProps }) => (
        <div ref={innerRef} {...droppableProps}>
          {children}
          {placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
