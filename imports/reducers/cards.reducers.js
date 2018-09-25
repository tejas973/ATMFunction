
const initialState = {}

export default function cards(state = initialState, action) {
    switch (action.type) {
        case 'CARD_VERIFY_REQUEST':
            return {
                requesting: true
            };
        case 'CARD_VERIFY_SUCCESS':
            return {
                ...state,
                requesting: false,
                verified: true,
                id: action.id,
                session: true
            };
        case 'CARD_VERIFY_FAILURE':
            return {
                ...state,
                requesting: false,
                verified: false,
                error: action.error
            };
        case 'SESSION_EXPIRED':
            return {
                ...state,
                session: false,
                error: action.error
            }
        case 'TRANSACTION_SUCCESS':
            return {
                ...state,
                transaction_success: true,
                payload: action.payload
            }
        case 'TRANSACTION_REQUEST':
            return {
                ...state,
                requesting: true
            }
        default:
            return state
    }
}