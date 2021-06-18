const express = require('express');
const path = require('path');
const mongodb = require('./mongoDB.js');
const userModel = require('./userSchema');
const videoModel = require('./VideoSchema');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'uploads')));

mongodb();

const Auth = require('./auth');
require('dotenv').config();
app.get('/', (req, res) => res.send('api-server'));

app.post('/signup', async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const hash = await bcrypt.hash(password, 10);

    let userDetails = new userModel({
      username: username,
      password: hash,
      avatar: password.length % 7,
    });
    await userDetails.save();
    res.json('Register sucessful');
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  let username = req.body.username;

  let user;

  user = await userModel.find({ username: username });

  console.log(user);

  if (user) {
    bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
      if (err) {
        res.json({
          message: 'Wrong Password',
        });
      }
      if (result) {
        let token = jwt.sign(
          {
            username: user[0].username,
            userid: user[0]._id,
            avatar: user[0].avatar,
          },
          process.env.SERCET,
          {
            expiresIn: '8h',
          }
        );
        res.status(200).json({
          message: 'User Found',
          token: token,
        });
        console.log('login');
      } else {
        res.json({
          message: 'Incorrect username/Password',
        });
      }
    });
  }
});

app.post('/uploadVideo', Auth, upload.single('video'), async (req, res) => {
  try {
    const newVideo = new videoModel({
      user_id: req.user.userid,
      videoUrl: req.file.filename,
      headline: req.body.headline,
      description: req.body.description,
    });

    newVideo.save();
    res.json('uploaded');
  } catch (error) {
    console.log(error);
  }
});
app.get('/userVideo', Auth, async (req, res) => {
  try {
    const videoList = await videoModel
      .find({ user_id: req.user.userid })
      .populate('user_id comments.user_id');

    res.json(videoList);
  } catch (error) {
    console.log(error);
  }
});
app.get('/allVideo', Auth, async (req, res) => {
  try {
    const videoList = await videoModel
      .find({}, { comments: 0 })
      .populate('user_id')
      .sort({ date: -1 });

    res.json(videoList);
  } catch (error) {
    console.log(error);
  }
});
app.get('/videoComment/:videoId', Auth, async (req, res) => {
  try {
    const videoList = await videoModel.findById(req.params.videoId);

    res.json({ videoId: req.params.videoId, comment: videoList.comments });
  } catch (error) {
    console.log(error);
  }
});
app.post('/addComment/:videoId', Auth, async (req, res) => {
  try {
    const newComment = await videoModel.findById(req.params.videoId);
    newComment.comments.unshift({
      user_id: req.user.userid,
      comment: req.body.comment,
      avatar: req.user.avatar,
    });

    newComment.save();
    const finalComment = {
      comment: req.body.comment,
      avatar: req.user.avatar,
      date: Date.now(),
      user_id: {
        username: req.user.username,
      },
    };
    res.json({
      videoId: req.params.videoId,
      comment: finalComment,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get('/soloVideo/:videoId', Auth, async (req, res) => {
  try {
    const video = await videoModel
      .findById(req.params.videoId)
      .populate('user_id comments.user_id');

    res.json(video);
  } catch (error) {
    console.log(error);
  }
});
app.get('/updateView/:videoId', Auth, async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.videoId);
    video.views++;
    video.save();
    res.json(video);
  } catch (error) {
    console.log(error);
  }
});
app.get('/addLike/:videoId', Auth, async (req, res) => {
  try {
    const newComment = await videoModel.findById(req.params.videoId);
    newComment.likes.unshift(req.user.username);

    newComment.save();

    res.json({
      videoId: req.params.videoId,
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(5000, () => console.log('sever running on 5000'));
