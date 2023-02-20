\c nc_games_test
-- SELECT COUNT(*) as comment_count
-- FROM comments 

-- WHERE review_id = 4

SELECT
	review_id,
	COUNT(*)
FROM
	comments
GROUP BY
	review_id;