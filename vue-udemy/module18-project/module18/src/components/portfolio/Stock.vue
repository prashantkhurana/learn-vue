<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small>{{stock.price}} | Quantity : {{  stock.quantity}}</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{danger : insuffficientQuantity}">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success" @click="sellStock" :disabled=" insuffficientQuantity || quantity <= 0 || Number.isInteger(quantity)">
                        {{  insuffficientQuantity ? 'Not enough stock' : 'Sell' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .danger {
        border : 1px solid red;
    }

</style>


<script>
    import { mapActions } from 'vuex';
    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0
            }
        },
        computed: {
            insuffficientQuantity() {
                return this.quantity > this.stock.quantity;
            }
        },
        methods: {
            ...mapActions({
                portfolioSellStock: 'sellStock' // map this.portfolioSellStock() to this.$store.dispatch('sellStock')
            }),
            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                }
                //this.$store.dispatch('sellStock2', order);
                console.log("before sending order is {}", order);
                this.portfolioSellStock(order);
            }
        }
    }

</script>