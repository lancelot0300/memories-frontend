import { useAppSelector } from "../../state/store";
import { StatusesWrapper } from "./statuses.styles";
import Status from "./Status";

function Statuses() {
  const { activeRequests } = useAppSelector(
    (state) => state.activeRequests,
    (prev, next) => {
      return prev.activeRequests.length === next.activeRequests.length;
    }
  );

  if (activeRequests.length === 0) return null;

  return (
      <StatusesWrapper>
        {activeRequests.map((request) => (
          <Status key={request.index} request={request} />
        ))}
      </StatusesWrapper>
  );
}

export default Statuses;
