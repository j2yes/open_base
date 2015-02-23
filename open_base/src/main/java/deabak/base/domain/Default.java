package deabak.base.domain;

public class Default {
	
	private String id;
	//기본값 설정 1페이지, 1page에 8개
	private int page=1;
	private int limit=8;
	//페이징 처리시 사용할 start 변수
	private int start;
	//기본값 0번째 부터
	private int startIndex=0;
	private int totalCount;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		this.start = limit*(page-1);
		return start;
	}
	public int getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

}
