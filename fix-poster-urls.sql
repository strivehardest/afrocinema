-- Run this in: Supabase Dashboard > SQL Editor
-- Fixes all Nollywood movie poster_url, backdrop_url, and tmdb_id values

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/3nO3VboeVLVOwIHMkTRIwTrrKQP.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/8lUYBdpIo8ysI9UzVn8Zs1AwB5x.jpg',
  tmdb_id = 570465
WHERE title = 'King of Boys';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/qJpP0QJZE1Lcxswchana8opO9uW.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/dxknBvE4QZYZlJvV5OwvCpIzSkl.jpg',
  tmdb_id = 412196
WHERE title = 'The Wedding Party';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/nGwFsB6EXUCr21wzPgtP5juZPSv.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/rPSJAElGxOTko1zK6uIlYnTMFxN.jpg',
  tmdb_id = 1104040
WHERE title = 'Gangs of Lagos';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/ndS2uJ8Sum1qEU0fn5c8tdGAMDe.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/oQb0md9X1S48jwCkYhQzokKzH9z.jpg',
  tmdb_id = 543774
WHERE title = 'Lionheart';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/k8medyObgY0XTt2dL7BqjxXkqmw.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/vazIlxR1NEh3TS0Dsaz7Ipi14Gm.jpg',
  tmdb_id = 755340
WHERE title = 'Citation';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/kn28W24slBLyGr8ZIZnxNE5YZrY.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/9WxqnP9c29wXd03sALSpxpTx8fk.jpg',
  tmdb_id = 1172009
WHERE title = 'The Black Book';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/rlYKNuWvekF6GwmfHNn1c3wCPyX.jpg',
  backdrop_url = NULL,
  tmdb_id = 994506
WHERE title = 'Blood Sisters';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/xb30hkUpBm23stnVgDJGYGsC0R0.jpg',
  backdrop_url = 'https://image.tmdb.org/t/p/w1280/gCojEROJs4JUVCCMA4fDFGc8OFc.jpg',
  tmdb_id = 1023994
WHERE title = 'Anikulapo';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/t1tRYdnDvv8wWB9gsFUV8pRqRFf.jpg',
  backdrop_url = NULL,
  tmdb_id = 1005075
WHERE title = 'Brotherhood';

UPDATE nollywood_movies SET
  poster_url = 'https://image.tmdb.org/t/p/w500/aK7wpIsDAi9R6Vn518wb7JMEFVs.jpg',
  backdrop_url = NULL,
  tmdb_id = 979924
WHERE title = 'Ile Owo (Money House)';

-- Verify the changes
SELECT title, poster_url, backdrop_url, tmdb_id FROM nollywood_movies ORDER BY title;
