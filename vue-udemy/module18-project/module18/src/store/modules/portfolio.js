// @ts-check
const state = {
    funds : 1000,
    stocks : []
}


const mutations = {
    'BUY_STOCK': (state, {stockId, quantity, stockPrice}) => {
        const record = state.stocks.find(element => element.id == stockId);
        if (record) {
            record.quantity += quantity; 
        } else {
            state.stocks.push({
                id: stockId,
                quantity : quantity
            })
        }
        state.funds -= stockPrice * quantity;
    },
    'SELL_STOCK': (state, {stockId, quantity, stockPrice}) => {
        console.log(stockId);
        console.log(quantity);
        console.log(stockPrice);
        const record = state.stocks.find(element => element.id == stockId);
        console.log(record);
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            state.stocks.splice(state.stocks.indexOf(record));
        }
        state.funds += stockPrice * quantity;
    }

}

const actions = {
    sellStock: ({commit}, order) => {
        console.log("order is {}" , order);
        commit('SELL_STOCK', order);
    }
}

const getters = {
    stockPortfolio(state, getters) {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            return {
                id : stock.id,
                quantity : stock.quantity,
                name : record.name,
                price : record.price
            }
        })
    },
    funds(state) {
        return state.funds;
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}