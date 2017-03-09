import offenderReducer from '../../src/javascript/reducers/offender';

describe('#offenderReducer', () => {
    const defaultState = {
        selectedOffender: {},
        offendersProfiles: [],
        viperScores: []
    };

    it('returns a default state', () => {
        expect(offenderReducer(undefined, 'UNKNOWN_ACTION')).to.eql(defaultState);
    });

    it('returns defaultState with viper scores included', () => {
        const scores = [{ nomisId: "FOO", viperScore: 1 }];
        const action = { type: "GET_VIPER_SCORES", payload: scores };
        const expectedState = { ...defaultState, viperScores: scores }

        expect(offenderReducer(undefined, action)).to.eql(expectedState);
    });

    it('returns defaultState with offenders profiles included', () => {
        const profiles = [
            {
                "NOMS_Number": "foo",
                "Surname": "foobar",
                "First_Name": "foobaz",
                "Date_of_Birth": "foo-age"
            }
        ];
        const action = { type: "GET_OFFENDER_NOMIS_PROFILES", payload: profiles };
        const expectedState = { ...defaultState, offendersProfiles: profiles }

        expect(offenderReducer(undefined, action)).to.eql(expectedState);
    });
});