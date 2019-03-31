<template>
<div class="main-pannel-heading-container">
 <div class="start" :style="{'background':''+dominantColor+''}" ></div>
    <h1>{{title}}</h1>
    <div class="end" :style="{'background':''+dominantColor+''}" ></div>
</div>
</template>

<script>
export default {
props: ['dominantColor','title']
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Arvo");

*{
    font-family: Arvo;
}

.main-pannel-heading-container {
    display: flex;
        margin: 0 auto;
    width: 76vw;
    grid-column: 1fr 1fr 1fr;
    margin:  0 auto;
    width: 76vw;
    height: 1.5rem;
    flex-direction: row;
    justify-content: center;
}
@media only screen and (max-width: 1000px) { 

    .main-pannel-heading-container {

width: 100%;

     }


}

.start{
/* background-color: red; */
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    width: 2rem;
}

.end {
/* background-color: red; */
    flex-grow: 1;
}
h1{
    font-size: 2rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    height: 100%;
}
</style>
