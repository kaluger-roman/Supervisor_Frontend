export class Agent {
    async prepareAgent() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            console.log("Got MediaStream:", stream)
        } catch (error) {
            console.error("Error accessing media devices.", error)
        }
    }
}
