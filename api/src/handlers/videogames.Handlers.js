const {
    getAllVideogames,
    getVideogameById,
    getPlatforms,
  } = require("../controllers/videogameController");
  const { Videogame, Genre } = require("../db.js");
  
  const videogamesHandler = async (req, res) => {
    try {
      let { name } = req.query;
      let games = [];
      if (name) {
        games = await getAllVideogames().then((data) =>
          data.filter((game) =>
            game.name.toLowerCase().includes(name.toLowerCase())
          )
        );
        if (games.length === 0) {
          return res.status(400).send("Videogame not found");
        } else {
          return res.status(200).json(games);
        }
      } else {
        games = await getAllVideogames();
        return res.status(200).json(games);
      }
    } catch (error) {
      res.status(400);
    }
  };
  
  const videogamesPosts = async (req, res) => {
    try {
      let { name, description, platforms, background_image, released, genres, rating } =
        req.body;
  
      let game = await Videogame.create({name, description, platforms, background_image, released, genres, rating});
      let generos = await Genre.findAll({ where: { name: genres } });
      await game.addGenres(generos);
      return res.status(200).send("Videogame created successfully");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  
  const videogamesHandlerById = async (req, res) => {
    try {
      let { id } = req.params;
  
      const game = await getVideogameById(id);
      return res.status(200).json(game);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  
  const getPlatformsHandler = async (req, res) => {
    try {
      let platforms = await getPlatforms();
      return res.status(200).send(platforms);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };
  
  module.exports = {
    videogamesHandler,
    videogamesHandlerById,
    videogamesPosts,
    getPlatformsHandler,
  };
  