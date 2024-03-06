import { spawn } from 'child_process'

let scrapping_data = "";

const pythonProcess = spawn('python3.12', ['src/app/scrapping.py']);
pythonProcess.stdout.on('data', (data) => {
  scrapping_data = data.toString()
})

const Home: React.FC = () => {
  let scrapping_data_formated = "";
  for (let i = 0; i < scrapping_data.length; i++) {
    if ((scrapping_data[i] != "[") && (scrapping_data[i] != "]") && (scrapping_data[i] != ",") && (scrapping_data[i] != "'")) {
      scrapping_data_formated += scrapping_data[i];
    }
  }

  let scrapping_data_str = scrapping_data_formated.split(" ");
  let [pseudo, breed, succes_points, succes_progress, full_body, face] = scrapping_data_str;

  return (
    <div>
      <form>
        <input type='text' placeholder='connection' name='pseudo'></input>
        <input type='submit' value='login'></input>
      </form>
      <p>
      Pseudo: {pseudo}
      </p>
      <p>
      Classe: {breed}
      </p>
      <p>
      Points de succes: {succes_points}
      <br></br>
      Progression: {succes_progress}
      </p>
      <img src="" alt='full body img'></img>
      <img src={face} alt='face img'></img>
      <p>
      {full_body}
      <br></br>
      </p>
    </div>
  );
};

export default Home;
