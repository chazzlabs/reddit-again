import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import LoadingIndicator from '../../src/components/loading-indicator';

describe('Loading Inidicator component', () => {
    let loadingIndicatorNode;

    beforeEach(() => {
        const loadingIndicator = TestUtils.renderIntoDocument(<LoadingIndicator />);
        loadingIndicatorNode = ReactDOM.findDOMNode(loadingIndicator);
    });

    it('should not be empty', () => {
        expect(loadingIndicatorNode.childNodes.length).not.toBe(0);
    });

});
