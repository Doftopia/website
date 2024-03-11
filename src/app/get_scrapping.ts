import { spawn } from 'child_process'

let scrapping_data = "";

const pythonProcess = spawn('python3.12', ['src/app/scrapping.py']);
pythonProcess.stdout.on('data', (data) => {
  scrapping_data = data.toString()
})

export { scrapping_data }