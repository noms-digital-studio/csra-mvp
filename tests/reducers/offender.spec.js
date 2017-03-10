import offenderReducer from '../../src/javascript/reducers/offender';

describe('#offenderReducer', () => {
    const defaultState = {
        selected: {},
        profiles: [],
        viperScores: []
    };

    it('returns a default state', () => {
        expect(offenderReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
    });

    it('returns the state with viper scores included', () => {
        const scores = [{ nomisId: 'FOO', viperScore: 1 }];
        const action = { type: 'GET_VIPER_SCORES', payload: scores };
        const expectedState = { ...defaultState, viperScores: scores }

        expect(offenderReducer(undefined, action)).to.eql(expectedState);
    });

    it('returns the state with offenders profiles included', () => {
        const profiles = [
            {
                'NOMS_Number': 'foo',
                'Surname': 'foobar',
                'First_Name': 'foobaz',
                'Date_of_Birth': 'foo-age'
            }
        ];
        const action = { type: 'GET_OFFENDER_NOMIS_PROFILES', payload: profiles };
        const expectedState = { ...defaultState, profiles }

        expect(offenderReducer(undefined, action)).to.eql(expectedState);
    });

    it('returns the state with the selected offender', () => {
        const profile = {
                'NOMS_Number': 'foo',
                'Surname': 'foobar',
                'First_Name': 'foobaz',
                'Date_of_Birth': 'foo-age'
            };
        const action = { type: 'SELECT_OFFENDER', payload: profile };
        const expectedState = { ...defaultState, selected: profile };

        expect(offenderReducer(undefined, action)).to.eql(expectedState);
    });
});