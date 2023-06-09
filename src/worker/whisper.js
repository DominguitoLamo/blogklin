importScripts('https://www.unpkg.com/@xenova/transformers/dist/transformers.min.js')

const DEFAULT_GREEDY_PARAMS = {
	max_new_tokens: 50,
	num_beams: 1,
	temperature: 1,
	top_k: 0,
	do_sample: false
}

// Define model factories
// Ensures only one model is created of each type
class PipelineFactory {
    static task = null;
    static model = null;

    // NOTE: instance stores a promise that resolves to the pipeline
    static instance = null;

    constructor(tokenizer, model) {
        this.tokenizer = tokenizer;
        this.model = model;
    }

    static getInstance(model, progressCallback = null) {
        if (this.task === null) {
            throw Error("Must set task")
        }

        if (model === '') {
          throw Error("No Model Name")
        }

        if (this.model !== model) {
          this.model = model
          this.instance = pipeline(this.task, this.model, {
              progress_callback: progressCallback
          });
        }

        return this.instance;
    }
}

class AutomaticSpeechRecognitionPipelineFactory extends PipelineFactory {
    static task = 'automatic-speech-recognition'
}


self.addEventListener('message', async(event) => {
  speech_to_text(event.data)
})

async function speech_to_text(req) {
  self.postMessage({
    type: 'load',
    data: ''
  })
  let pipeline = await AutomaticSpeechRecognitionPipelineFactory.getInstance(`openai/${req.model}`)

  self.postMessage({
    type: 'generate',
    data: ''
  })
  const result = await pipeline(req.audio, {
      // Choose good defaults for the demo
      chunk_length_s: 30,
      stride_length_s: 5,

      ...DEFAULT_GREEDY_PARAMS,
  })
  self.postMessage({
    type: 'finish',
    data: result.text.trim()
  });
  self.close()
}