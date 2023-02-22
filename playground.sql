\c nc_games_test
SELECT reviews.title, reviews.owner , reviews.review_id, reviews.category, review_img_url, reviews.review_body, reviews.created_at, reviews.votes, reviews.designer, COUNT(comment_id) as comment_count
FROM reviews
LEFT JOIN comments ON reviews.review_id = comments.review_id 
GROUP BY reviews.review_id