<template>
    <section>
        <div class="control-bar">
            <i class="far fa-play-circle"></i>
            <i class="fas fa-bookmark"></i>
            <i class="fas fa-list-ul"></i>
            <i class="fas fa-heart"></i>
            <i class="fas fa-star"></i>
        </div>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
i:hover{
    cursor: pointer;
}
i {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.863);
}
.fa-play-circle {
    font-size: 4rem;
    margin-right: 1rem
}
.control-bar {
        display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>
