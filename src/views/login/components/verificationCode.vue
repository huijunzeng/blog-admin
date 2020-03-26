<template>
    <canvas id="verification-code" height="40" width="95" @click="resetCode"></canvas>
</template>

<style lang="scss" scoped>
canvas {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    cursor: pointer;
}
</style>


<script>
import { randomBetween } from '@/utils'

const nums = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]

export default {
    data() {
        return {
            identifyCode: ''
        }
    },
    mounted() {
        this.drawPic()
    },
    methods: {
        randomColor(min, max) {
            var r = randomBetween(min, max)
            var g = randomBetween(min, max)
            var b = randomBetween(min, max)
            return `rgb(${r}, ${g}, ${b})`
        },
        drawPic() {
            let canvas = document.querySelector('#verification-code')
            let ctx = canvas.getContext('2d')
            ctx.fillStyle = this.randomColor(180, 240)
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            // ctx.font = '25px Arial'
            this.identifyCode = ''
            for (let i = 0; i < 4; i++) {
                let num = nums[randomBetween(0, nums.length)]
                this.identifyCode += num
                this.drawText(ctx, num, i, canvas)
            }
            // this.drawLine(ctx, canvas)
            this.drawDot(ctx, canvas)
            this.$emit('click', this.identifyCode)
        },
        drawText(ctx, txt, i, canvas) {
            ctx.fillStyle = this.randomColor(0, 155)
            ctx.font = randomBetween(20, 36) + 'px Arial'
            let x = (i) * (canvas.width / (5)) + 10
            let y = randomBetween(40, canvas.height - 5) - 8
            let deg = randomBetween(-20, 20)
            // 修改坐标原点和旋转角度
            ctx.translate(x, y)
            ctx.rotate(deg * Math.PI / 180)
            ctx.fillText(txt, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180)
            ctx.translate(-x, -y)
        },
        drawLine(ctx, canvas) {
            // 绘制干扰线
            for (let i = 0; i < 4; i++) {
                ctx.strokeStyle = this.randomColor(40, 180)
                ctx.beginPath()
                ctx.moveTo(
                    randomBetween(0, canvas.width),
                    randomBetween(0, canvas.height)
                )
                ctx.lineTo(
                    randomBetween(0, canvas.width),
                    randomBetween(0, canvas.height)
                )
                ctx.stroke()
            }
        },
        drawDot(ctx, canvas) {
            // 绘制干扰点
            for (let i = 0; i < 40; i++) {
                ctx.fillStyle = this.randomColor(0, 255)
                ctx.beginPath()
                ctx.arc(
                    randomBetween(0, canvas.width),
                    randomBetween(0, canvas.height),
                    1,
                    0,
                    2 * Math.PI
                )
                ctx.fill()
            }
        },
        resetCode() {
            this.drawPic()
        }
    }
}
</script>
