// Reducer to be tested
import PaymentReducer from '../../src/Reducers/PaymentReducer';
import PaymentConstants from '../../src/Constants/PaymentConstants';

describe('PaymentReducer', () => {
  test('GETALL_SUCCESS', () => {
    const action = { 
      type: PaymentConstants.GETALL_SUCCESS, 
      paymentStatuses: [],
    };

    expect(PaymentReducer(undefined, action)).toMatchSnapshot();
  });
});
