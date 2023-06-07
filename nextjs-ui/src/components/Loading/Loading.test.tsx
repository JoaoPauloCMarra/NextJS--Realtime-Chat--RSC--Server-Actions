import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading, { testID } from './Loading';

describe('Loading', () => {
  it('should render a loading spinner', () => {
    render(<Loading />);

    const container: HTMLDivElement = screen.getByTestId(testID.container);
    const spinner: HTMLDivElement = screen.getByTestId(testID.spinner);

    expect(container).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });
});
