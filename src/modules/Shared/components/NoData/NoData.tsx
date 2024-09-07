import NoDataImg from "../../../../assets/no-data.svg"

export default function NoData() {
  return (
    <div className="text-center">
      <img src={NoDataImg} alt="no-data-logo" />
      <h4 className="my-3">No Data !</h4>
      <p className="text-muted">
        are you sure you want to delete this item ? if you are sure just <br />{" "}
        click on delete it
      </p>
    </div>
  );
}
