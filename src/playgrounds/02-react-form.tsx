import { useState } from 'react';
import FormInput from '@/components/form-input';
import FormTextArea from '@/components/form-textarea';

const formStyles = {
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'start',
  gap: 20,
};

function ReactForm() {
  const [age, setAge] = useState<number>(22);
  const [color, setColor] = useState<string>('#2483DB');
  const [limitAge, setLimitAge] = useState<number>(40);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleUploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    if (target.files && target.files.length > 0) {
      const file = target.files.item(0);
      if (file) {
        setProfileImage(URL.createObjectURL(file));
      }
    }
  };

  // 컴포넌트 상태 변수 (state variable: 컴포넌트 외부의 상태 관리 시스템 기억)
  const [photos, setPhotos] = useState<File[]>([]);

  // 파생된 상태 변수 (derived state variable)
  const photoURLs = photos.map((photo) => URL.createObjectURL(photo));

  // 상태 업데이트 핸들러 (이벤트 감지되면 실행)
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setPhotos(Object.values(fileList)); // [File, File, ...]
    }
  };

  const [contents, setContents] = useState<string>(
    '모든 사람들에게 전할 메시지를 남겨주세요~'
  );

  const handleUpdateContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  // radio input state (checked)
  const [isFemale, setIsFemale] = useState<boolean>(true);
  const handleToggleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFemale = e.target.value === 'female';
    setIsFemale(isFemale);
  };

  // checkbox input state (checked)
  // 배열
  // Checkbox { id?, name, label, value, checked }
  // Checkbox[]
  const [hobbyList, setHobbyList] = useState([
    {
      name: 'userhobby',
      label: '공부',
      value: 'study',
      checked: true,
    },
    {
      name: 'userhobby',
      label: '영화 감상',
      value: 'watch-a-movie',
      checked: false,
    },
    {
      name: 'userhobby',
      label: '운동',
      value: 'helth',
      checked: false,
    },
    {
      name: 'userhobby',
      label: '바디 프로필 촬영',
      value: 'photo-body-profile',
      checked: true,
    },
  ]);

  // derived state
  // - 모두 체크 되었나?
  const isAllCheckedHobbyList = hobbyList.every((hobby) => hobby.checked);
  console.log({ isAllCheckedHobbyList });
  // - 모두 체크 안되었나?
  const isNotAllCheckedHobbyList = hobbyList.every((hobby) => !hobby.checked);
  console.log({ isNotAllCheckedHobbyList });

  const handleCheckedHobbies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked: nextCheckedValue } = e.target;

    const nextHobbyList = hobbyList.map((hobby) => {
      if (hobby.value === value) {
        return {
          ...hobby,
          checked: nextCheckedValue,
        };
      } else {
        return hobby;
      }
    });

    setHobbyList(nextHobbyList);
  };

  return (
    <div className="ReactForm">
      <h2>React 폼(form)</h2>

      <form style={formStyles}>
        {/* type=radio */}
        <fieldset>
          <legend>성별</legend>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            <FormInput
              type="radio"
              label="여성"
              name="usergender"
              value="female"
              checked={isFemale}
              onChange={handleToggleGender}
            />
            <FormInput
              type="radio"
              label="남성"
              name="usergender"
              value="male"
              checked={!isFemale}
              onChange={handleToggleGender}
            />
          </div>
        </fieldset>

        {/* type=checkbox */}
        <fieldset>
          <legend>취미</legend>
          {hobbyList.map((hobby) => (
            <FormInput
              key={hobby.label}
              type="checkbox"
              label={hobby.label}
              name={hobby.name}
              value={hobby.value}
              checked={hobby.checked}
              onChange={handleCheckedHobbies}
            />
          ))}
        </fieldset>

        {/* type=text */}
        <FormInput label="이름" placeholder="박수무당" />

        {/* type=password */}
        <FormInput
          type="password"
          label="비밀번호"
          placeholder="영어, 숫자 조합 4자리 이상"
        />

        {/* type=email */}
        <FormInput type="email" label="이메일" placeholder="user@company.io" />

        {/* type=number, controlled component */}
        <FormInput
          type="number"
          label="나이"
          value={age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            // const nextAgeValue: number = +value;
            // const nextAgeValue: number = Number(value);
            const nextAgeValue: number = parseInt(value, 10);
            setAge(nextAgeValue);
          }}
        />

        {/* type=color */}
        <FormInput
          type="color"
          label="색상"
          value={color}
          onChange={(e) => {
            const { value } = e.target;
            setColor(value);
          }}
        />

        {/* type=range */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <FormInput
            type="range"
            label="시청 허용 나이"
            min={10}
            max={90}
            step={10}
            value={limitAge}
            onChange={(e) => {
              const { value } = e.target;
              setLimitAge(parseInt(value, 10));
            }}
          />
          <output>{limitAge}</output>
        </div>

        {/* type=date */}
        <FormInput type="date" label="여행 날짜" />

        {/* type=datetime-local */}
        <FormInput type="datetime-local" label="비행기 출국 시간" />

        <FormTextArea
          label="인사말"
          name="contents"
          value={contents}
          onChange={handleUpdateContents}
          resize="vertical"
        />
        <FormTextArea
          label="프로포즈"
          name="propose"
          defaultValue="propose"
          resize="horizontal"
        />

        {/* type=file (1) */}
        <div style={{ padding: 12, border: '0.5px solid rgba(0 0 0 / 30%)' }}>
          <FormInput
            type="file"
            label="프로필"
            accept="image/*"
            onChange={handleUploadProfile}
          />
          {profileImage && (
            <img
              style={{ marginBlockStart: 8 }}
              src={profileImage}
              alt="업로드 할 프로필"
              width={100}
              height={100}
            />
          )}
        </div>

        {/* type=file (N) */}
        <div style={{ padding: 12, border: '0.5px solid rgba(0 0 0 / 30%)' }}>
          <FormInput
            type="file"
            label="포토"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleUploadPhotos}
          />
          {photos.length > 0
            ? photos.map(({ name }, index) => (
                <img
                  key={name}
                  style={{ marginBlockStart: 8 }}
                  src={photoURLs.at(index)}
                  alt={name}
                  width={68}
                  height={68}
                />
              ))
            : null}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">제출</button>
          <button type="reset">초기화</button>
        </div>
      </form>
    </div>
  );
}

export default ReactForm;
