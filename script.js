(Sem banco real ainda — só memória)

using SonoApp.Models;

namespace SonoApp.Services
{
    public static class DataService
    {
        public static List<SleepData> SleepList = new()
        {
            new SleepData {
                Id = 1,
                Score = 87,
                DuracaoMinutos = 465,
                SonoProfundo = 72,
                Data = DateTime.Now
            }
        };

        public static List<Sound> Sounds = new()
        {
            new Sound {
                Id = 1,
                Nome = "Chuva tranquila",
                Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                Duracao = 30
            }
        };
    }
}