import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from '../../src/components/loading-indicator';

describe('Loading Inidicator component', () => {
    let LoadingIndicatorWrapper;

    beforeEach(() => {
        LoadingIndicatorWrapper = shallow(
            <LoadingIndicator requiredProp="Test message" />
        );
    });

    it('should not be empty', () => {
        expect(LoadingIndicatorWrapper.children().length).not.toBe(0);
    });

});
