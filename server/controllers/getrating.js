const {db} = require('../firebase-confing')


const getRating = async (req, res) => {
    try {
      const ratingCollection = await db.collection('rating').get();
  
      let totalRating = 0;
      let numRatings = 0;
      ratingCollection.forEach((doc) => {
        doc.data().ratings.forEach((rating)=>{
          totalRating += rating;
          numRatings++;
        })
      });
  
      const averageRating = totalRating / numRatings;

      const roundedAverage =  Math.round(averageRating);

      res.status(200).json({ averageRating: roundedAverage });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  module.exports = getRating;
  