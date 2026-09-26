import { ContentHeading, ContentNavigation } from "@/components/EditorialContent";
import styles from "@/components/EditorialContent.module.css";
import PageBanner from "@/components/PageBanner";

export const metadata = { title: "관리주체의 의무사항" };

const SELECTION = [
  ["연면적 6만㎡ 이상 / 3천세대 이상 공동주택", "특급·보조", "1명·1명", "2021.4.17~"],
  ["연면적 3만~6만㎡ / 2천~3천세대 공동주택", "고급·보조", "1명·1명", "2021.4.17~"],
  ["연면적 1.5만~3만㎡ / 1천~2천세대 / 공공건축물 등", "중급", "1명", "2022.4.17~"],
  ["연면적 1만~1.5만㎡ / 500~1천세대 / 300~500세대 지역·중앙난방", "초급", "1명", "2023.4.17~"],
];

const FINE500 = [
  "유지관리기준을 준수하지 않은 자",
  "점검기록을 작성하지 않거나 거짓 작성한 자",
  "점검기록을 보존하지 않은 자",
  "기계설비유지관리자를 선임하지 않은 자",
];

const FINE100 = [
  "착공 전 확인·사용 전 검사 자료를 제출하지 않은 자",
  "점검기록을 제출하지 않은 자",
  "유지관리교육을 받지 않은 사람을 해임하지 않은 자",
  "유지관리자 선·해임을 신고하지 않거나 거짓 신고한 자",
  "유지관리교육을 받지 않은 유지관리자",
];

export default function ObligationsPage() {
  return (
    <>
      <PageBanner breadcrumb="주요업무" title="관리주체의 의무사항" />
      <div className={styles.page}>
        <div className={`container-x ${styles.documentLayout}`}>
          <ContentNavigation title="관리주체 안내" items={[
            { id: "technical-standards", label: "기술기준 준수" },
            { id: "maintenance-standards", label: "유지관리기준 준수" },
            { id: "penalties", label: "행정 조치사항" },
          ]} />
          <div className={styles.documentBody}>
            <section id="technical-standards" aria-labelledby="technical-heading">
              <ContentHeading number="01" title="기계설비의 기술기준 준수" id="technical-heading" />
              <div className={styles.requirements}>
                <div className={styles.requirement}>
                  <span aria-hidden="true">BEFORE CONSTRUCTION</span>
                  <h3>착공 전 확인</h3>
                  <p>발주자는 공사 시작 전, 기계설비 설계도서가 기술기준에 적합한지 확인을 받아야 합니다.</p>
                </div>
                <div className={styles.requirement}>
                  <span aria-hidden="true">BEFORE OPERATION</span>
                  <h3>사용 전 검사</h3>
                  <p>발주자는 공사 완료 시 사용 전 검사를 받은 후 기계설비를 사용해야 합니다.</p>
                </div>
              </div>
              <p className={styles.note}>관할기관: 특별자치시장, 특별자치도지사, 시장, 군수, 구청장(자치구)</p>
            </section>

            <section id="maintenance-standards" aria-labelledby="maintenance-heading">
              <ContentHeading number="02" title="기계설비의 유지관리기준 준수" id="maintenance-heading" />
              <p className={styles.copy}>
                <strong>책임기계설비유지관리자 선임</strong> — 관리주체는 대상 건축물의 세대수·연면적에 따라
                유지관리자를 선임하여 현장에 상주시켜야 합니다.
              </p>

              <div className={styles.selectionTable}>
                <table>
                  <caption>건축물 규모에 따른 유지관리자 선임 기준</caption>
                  <thead><tr>
                    <th scope="col">대상 건축물</th><th scope="col">자격</th><th scope="col">인원</th><th scope="col">적용시기</th>
                  </tr></thead>
                  <tbody>
                    {SELECTION.map((row) => (
                      <tr key={row[0]}>
                        <th scope="row">{row[0]}</th>
                        <td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className={styles.selectionCards} aria-label="건축물 규모에 따른 유지관리자 선임 기준">
                {SELECTION.map((row) => (
                  <li key={row[0]}>
                    <h3>{row[0]}</h3>
                    <dl>
                      <div><dt>자격</dt><dd>{row[1]}</dd></div>
                      <div><dt>인원</dt><dd>{row[2]}</dd></div>
                      <div><dt>적용시기</dt><dd>{row[3]}</dd></div>
                    </dl>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>
                기계설비법 시행일(2020.4.18) 이전부터 계속 근무한 유지관리자는 임시관리자 자격을
                발급받아 선임할 수 있으며, 퇴직 시 자격은 소멸됩니다.
              </p>
              <div className={styles.duties}>
                <div>
                  <h3>유지관리자 교육</h3>
                  <p>선임 후 6개월 이내 선임교육, 이수일로부터 3년이 지난 날부터 3개월 이내 보수교육. 2회 이상 교육을 받지 않으면 해임 대상입니다.</p>
                </div>
                <div>
                  <h3>성능점검 등 의무</h3>
                  <p>유지관리지침서 구비, 유지관리·성능점검계획 수립, 안전조치계획 수립, 유지관리 점검(반기별 1회 이상), 성능점검(매년 1회 이상).</p>
                </div>
              </div>
            </section>

            <section id="penalties" aria-labelledby="penalties-heading">
              <ContentHeading number="03" title="법 위반 시 행정 조치사항" id="penalties-heading" />
              <div className={styles.penalties}>
                <div className={styles.penalty}>
                  <h3><strong>500</strong>만원 이하<span>과태료 (법 제30조)</span></h3>
                  <ul className={styles.bullets}>{FINE500.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className={styles.penalty}>
                  <h3><strong>100</strong>만원 이하<span>과태료 (법 제30조)</span></h3>
                  <ul className={styles.bullets}>{FINE100.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
