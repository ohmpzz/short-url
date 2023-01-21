import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { fetchByCode } from 'features/ShortUrl/slice';

export function ShortUrlPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [found, setFound] = useState<boolean>(true);

  useEffect(() => {
    if (params?.id && params?.id != undefined) {
      dispatch(fetchByCode({ code: params?.id }))
        .unwrap()
        .then((res) => {
          window.location.replace(`${res?.long_url}`);
        })
        .catch((err) => setFound(false));
    }
  }, [params?.id]);

  return (
    <div>
      {!found ? (
        <>
          <h1>ไม่พบข้อมูล</h1>
          <Link to="/">
            <span>กลับหน้าหลัก</span>
          </Link>
        </>
      ) : null}
    </div>
  );
}

export default ShortUrlPage;
