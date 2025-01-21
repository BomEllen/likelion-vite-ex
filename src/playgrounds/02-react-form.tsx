import FormInput from '@/components/form-input';

function ReactForm() {
  return (
    <div className="ReactForm">
      <h2>React 폼(form)</h2>
      <form>
        <FormInput type="text" label="이름" placeholder="박수무당" />
        <FormInput
          type="password"
          label="비밀번호"
          placeholder="영어, 숫자 조합 4자리 이상"
        />
        <FormInput
          type="number"
          label="나이"
          defaultValue={20}
          data-name="폼 인풋"
          data-type="input"
          title="컴포넌트 만세!"
          v-for="data in list"
        />
        <FormInput type="color" label="색상" />
        <FormInput type="range" label="시청 허용 나이" />

        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default ReactForm;
